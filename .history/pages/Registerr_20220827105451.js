import React, { useRef, useState, useEffect } from 'react';
import { submitRegister } from '../services';

const Registerr = ({slug}) => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  // const [formData, setFormData] = useState({ name: null, email: null, comment: null, storeData: false });
  const usernameEl = useRef();
  const emailEl = useRef();
  const passwordEl = useRef();
  const storeDataEl = useRef();

  useEffect(() => {
      usernameEl: window.localStorage.getItem('username');
      emailEl: window.localStorage.getItem('email');
      passwordEl: window.localStorage.getItem('password');
  }, [])


  const handleCommentSubmission = () => {
    setError(false);

    const { value: username } = usernameEl.current;
    const { value: email } = emailEl.current;
    const { value: password } = passwordEl.current;
    const { checked: storeData } = storeDataEl.current;

    if( !usernameEl || !emailEl || !passwordEl) {
      setError(true)
      return;
    }

    const commentObj = {
      username,
      email,
      password,
      slug,
    };

    if (storeData) {
      window.localStorage.setItem('username', username);
      window.localStorage.setItem('email', email);
      window.localStorage.setItem('password', password);
    } else {
      window.localStorage.removeItem('username');
      window.localStorage.removeItem('email');
      window.localStorage.removeItem('password');
    }

    submitRegister(commentObj)
      .then((res) => {
          setShowSuccessMessage(true);

          setTimeout(() => {
            setShowSuccessMessage(false);
          }, 3000);
        }
      );
  }
 
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Leave a Reply</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input
          type="text" ref={nameEl}
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700" 
          placeholder="Name" 
          name="name" />
        <input 
         type="email" ref={emailEl}
         className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700" 
         placeholder="Email" 
         name="email" />
      </div>
      
      {error && <p className="text-xs text-red-500">All fields are mandatory</p>}
      <div className="mt-8">
        <button type="button" onClick={handleCommentSubmission} className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer">Post Comment</button>
        {showSuccessMessage && <span className="text-xl float-right font-semibold mt-3 text-green-500">Comment submitted for review</span>}
      </div>
    </div>
  );

export default Registerr