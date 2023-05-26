import React, { useContext, useEffect, useState } from 'react';
import Profile from '../components/Profile/profiledelete';
import { AuthContext } from '../contexts/AuthContext';



const URL = `${process.env.REACT_APP_BASE_URL}authors/all`;

interface ProfileData {
  _id: string;
  email: string;
  username: string;
  books: string;
  image: File | string;
}

const fetchHandler = async () => {
  try {
    const response = await fetch(URL);
    if (response.ok) {
      const data = await response.json();
      return { profiles: data }; // Wrap the data in an object with the 'profiles' key
    } else {
      throw new Error('Failed to fetch data');
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const Profiles: React.FC = () => {
  // const [profiles, setProfiles] = useState<ProfileData[]>([]); //NOTE modify ProfileData type to match the info coming from the database (books is now an array of Books)
  const [userProfile, setUserProfile] = useState<any>({});
  const { author } = useContext(AuthContext)
  console.log('author.id', author)

  const getAuthorProfile = async () => {

    try {
      const response = await fetch(`http://localhost:5000/api/authors/id/${author?._id}`)
      const result = await response.json()
      console.log('result', result)
      setUserProfile(result)
    } catch (error) {
     console.log('error getting author profile', error)
    }
    
  }
  useEffect(() => {
   getAuthorProfile()
  }, [])
  

  // useEffect(() => {
  //   fetchHandler().then((data: { profiles: ProfileData[] } | null) => {
  //     if (data && data.profiles) {
  //       setProfiles(data.profiles);
  //     }
  //   });
  // }, []);

  // console.log(profiles);

  return (
    <div className='books-container'>
      <h1>Profile info</h1>
          <Profile profile={userProfile} />

      {/* {profiles.map((profile: ProfileData, i: number) => (
        <div className='book' key={i}>
         
          <Profile profile={author} />
        </div>
      ))} */}
    </div>
  );
};

export default Profiles;


// import React, { useEffect, useState } from 'react';
// import Profile from '../components/Profile/profiledelete';

// const URL = `${process.env.REACT_APP_BASE_URL}authors/all`;

// interface ProfileData {
//   _id: string;
//   email: string;
//   username: string;
//   books: string;
//   image: File | string;
// }

// const fetchHandler = async () => {
//   try {
//     const response = await fetch(URL);
//     if (response.ok) {
//       const data = await response.json();
//       return { profiles: data }; // Wrap the data in an object with the 'profiles' key
//     } else {
//       throw new Error('Failed to fetch data');
//     }
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// };

// const Profiles: React.FC = () => {
//   const [profiles, setProfiles] = useState<ProfileData[]>([]);
//   const [activeUser, setActiveUser] = useState<ProfileData | null>(null);

//   useEffect(() => {
//     fetchHandler().then((data: { profiles: ProfileData[] } | null) => {
//       if (data && data.profiles) {
//         setProfiles(data.profiles);
//       }
//     });
//   }, []);

//   // Assuming you have a way to determine the active user, update the setActiveUser call accordingly
//   const determineActiveUser = () => {
//     const activeUserId = 'your-active-user-id';
//     const user = profiles.find((profile) => profile._id === activeUserId);
//     setActiveUser(user || null);
//   };

//   useEffect(() => {
//     determineActiveUser();
//   }, [profiles]);

//   return (
//     <div className='books-container'>
//       {activeUser && (
//         <div className='book'>
//           <Profile profile={activeUser} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profiles;