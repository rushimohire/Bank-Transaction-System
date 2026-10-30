const User = require("../models/user");
const Transaction = require("../models/Transaction")
const bcrypt = require("bcrypt")
const Notification = require("../models/Notification");

exports.depositMoney = async (req, res) => {
  try {
    const { amount, transactionPin } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "user not find" });
    }

     // convert amount to number ✅
    const amountNum = Number(amount);

    if (amountNum <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    // verify the pin
    const isMacth = await bcrypt.compare(transactionPin, user.transactionPin);

    if (!isMacth) {
      return res.status(404).json({ message: "transtion pin not maching" });
    }

    //incrse the balance
    user.balance += Number(amount);

    await user.save();

    //   create the transtion from user

    await Transaction.create({
      user: user._id,
      sender: user._id,
      receiver: user._id,
       amount: amountNum,
      type: "deposit",
    });

     // 🔥 NOTIFICATION
    await Notification.create({
      user: user._id,
      message: `You deposited ₹${amountNum}`,
    });


    res.status(200).json({ message: "depost sucessfuly" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  send money

exports.sendMoney = async (req, res) => {
  const { receiverEmail, amount, transactionPin } = req.body;

  try {

    const sender = await User.findById(req.user.id);

    if (!sender) {
      return res.status(404).json({ message: "invalid user" });
    }
    
     const receiver = await User.findOne({ email: receiverEmail });

    if (!receiver) {
      return res.status(404).json({ message: "receiver not found" });
    }

    // prevent self transfer
    if (sender._id.toString() === receiver._id.toString()) {
      return res.status(400).json({ message: "Cannot send to yourself" });
    }

    const amountNum = Number(amount);

      if (amountNum <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    // check pin
    const isMatch = await bcrypt.compare(transactionPin, sender.transactionPin);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid transaction pin" });
    }

    if (sender.balance < amountNum) {
      return res.status(400).json({ message: "Insufficient balance" });
    }
    
     // update balance
    sender.balance -= amountNum;
    receiver.balance += amountNum;

    await sender.save();
    await receiver.save();

    await Transaction.create({
      user: sender._id,
      sender: sender._id,
      receiver: receiver._id,
      amount: amountNum,
      type: "send",
      status: "success",
    });

    // 🔥 NOTIFICATIONS
    await Notification.create({
      user: sender._id,
      message: `You sent ₹${amountNum} to ${receiver.name}`,
    });

    await Notification.create({
      user: receiver._id,
      message: `You received ₹${amountNum} from ${sender.name}`,
    });

    res.status(200).json({ message: "Money sent successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//history Transaction showing

// exports.getTransactions = async (req, res) => {
//   try {
//     const transactions = await Transaction.find({
//       $or: [{ sender: req.user.id }, { receiver: req.user.id }],
//     })
//       .populate("sender", "name email")
//       .populate("receiver", "name email")
//       .sort({ createdAt: -1 });

//     res.json(transactions);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      $or: [
        { sender: req.user.id },
        { receiver: req.user.id }
      ]
    })
    .populate("sender", "name email")
    .populate("receiver", "name email")
    .sort({ createdAt: -1 });

    res.json(transactions);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// all Get Balance


exports.getBalance = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("balance");

    res.json({
      balance: user.balance
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



/// change password 

exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id);

    // check old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Old password incorrect" });
    }

    // hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    res.json({ message: "Password updated successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//Change Transaction PIN


exports.changeTransactionPin = async (req, res) => {
  try {
    const { oldPin, newPin } = req.body;

    const user = await User.findById(req.user.id);

    // check old pin
    const isMatch = await bcrypt.compare(oldPin, user.transactionPin);

    if (!isMatch) {
      return res.status(400).json({ message: "Old PIN incorrect" });
    }

    // hash new pin
    const hashedPin = await bcrypt.hash(newPin, 10);

    user.transactionPin = hashedPin;

    await user.save();

    res.json({ message: "Transaction PIN updated successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};