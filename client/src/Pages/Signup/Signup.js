import { useState } from 'react'
import { useSignup } from '../../Hooks/useSignup';
import { Link } from 'react-router-dom';

const Signup = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const { signup, error } = useSignup();
  
   const handleSubmit = async (e) => {
      e.preventDefault();
      await signup(email, password);
      setEmail("");
      setPassword("");
   };

   return (
      <div className="main-form">
         <form onSubmit={handleSubmit}>
            <h1>Signup</h1>

            <div className="field">
               <label>Email:</label>
               <input 
                  type="email" 
                  onChange={(e) => setEmail(e.target.value)}  
                  value={email} 
                  required 
               />
            </div>

            <div className="field">
               <label>Password:</label>
               <input 
                  type="password" 
                  onChange={(e) => setPassword(e.target.value)}  
                  value={password} 
                  required 
               />
            </div>

            <button type="submit">Submit</button>
            {error && <p>{error}</p>}

            {/* Already have account message */}
            <p className="account-link">
               Already have an account? <Link to="/login">Login here</Link>
            </p>
         </form>
      </div>
   )
}

export default Signup;
