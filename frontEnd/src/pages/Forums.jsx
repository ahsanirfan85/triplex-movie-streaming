// import React from 'react';
// import Forum from "../components/Forum"
// import PageHeader from '../components/page-header/PageHeader';


// const Forums = () => {
//     return (
//         <>
//         <PageHeader />
//             <h1 className='forums__title'>DISCUSSION FORUM</h1>
            
//             <Forum />
            
//         </>
//     );
// }

// export default Forums

import Comments from "../components/comments/Comments";

const Forums = () => {
  return (
    <div>
      <h1>Hello Forum</h1>
      <Comments
        commentsUrl="http://localhost:3004/comments"
        currentUserId="1"
      />
    </div>
  );
};

export default Forums;
