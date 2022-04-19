import React, { useState } from 'react'
import "../Forum/forums.scss"
import DiscussionBoard from 'react-discussion-board'
import 'react-discussion-board/dist/index.css'
import fakeDB from './tempDB'

const Forums = () => {

  const db = fakeDB;
  
  const [posts, setPosts] = useState(db)

  const submitPost = (text) => {
    console.log(text);
    const curDate = new Date(Date.now());

    const profileImage = 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
    const name = 'John Doe'

    setPosts([
      ...posts,
      {
        profileImage:
          profileImage,
        name: name,
        content: text,
        date: curDate
      }
    ])
  }

  return (
    <>
      <div className="forums-container">
        <div className="forums">
        <DiscussionBoard posts={posts} onSubmit={submitPost} />
        
      </div>
    </div>


      

    </>
  )
      // <DiscussionBoard posts={ posts } onSubmit={ submitPost } />
  
}

export default Forums