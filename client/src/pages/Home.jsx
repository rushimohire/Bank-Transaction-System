// // const Home = () => {
// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#0F172A] via-[#1E293B] to-[#020617] px-4">
      
// //       <div className="glass-card p-8 md:p-12 text-center max-w-md w-full">
        
// //         <h1 className="text-2xl md:text-4xl font-bold mb-4">
// //           Welcome to Bank App
// //         </h1>

// //         <p className="text-gray-300 text-sm md:text-base">
// //           Manage your money securely and easily 💳
// //         </p>

// //       </div>

// //     </div>
// //   );
// // };

// // export default Home;

// import { Link } from "react-router-dom";

// const Home = () => {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#0F172A] via-[#1E293B] to-[#020617] px-4">
      
//       <div className="glass-card p-8 md:p-12 text-center max-w-md w-full">
        
//         <h1 className="text-2xl md:text-4xl font-bold mb-4">
//           Welcome to Bank App
//         </h1>

//         <p className="text-gray-300 text-sm md:text-base mb-6">
//           Manage your money securely and easily 💳
//         </p>

//         {/* Dashboard Button */}
//         <Link
//           to="/dashboard"
//           className="btn-primary inline-block w-full text-center"
//         >
//           Go to My bank
//         </Link>

//       </div>

//     </div>
//   );
// };

// export default Home;


import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#0F172A]/80"></div>

      {/* Content */}
      <div className="relative glass-card p-8 md:p-12 text-center max-w-md w-full">
        
        <h1 className="text-2xl md:text-4xl font-bold mb-4">
          Welcome to Bank App
        </h1>

        <p className="text-gray-300 text-sm md:text-base mb-6">
          Manage your money securely and easily 💳
        </p>

        <Link
          to="/dashboard"
          className="btn-primary inline-block w-full text-center"
        >
          Go to My bank
        </Link>

      </div>
    </div>
  );
};

export default Home;