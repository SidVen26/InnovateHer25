// 'use client';
// import { useUser } from '@auth0/nextjs-auth0/client';
// export default function chatBot() {
//   const { user, error, isLoading } = useUser();
//   // return (
//   //   <h1>Chat Bot Page</h1>
//   // );
//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>{error.message}</div>;

//   return (
//     user && (
//       <div>
//         <h1>Chat Bot Page</h1>
//         {/* <img src={user.picture} alt={user.name} /> */}
//         {/* <h2>{user.name}</h2> */}
//         {/* <p>{user.email}</p> */}
//         {console.log(user.name)}
//       </div>
//     )
//   );
// }