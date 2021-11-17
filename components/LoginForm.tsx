import { useState } from 'react';

import { Heading } from '@chakra-ui/react';

import { supabase } from '../utils/supabase';

const LoginForm = () => {
  console.group('LoginForm');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleLogin = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email });
      if (error) throw error;
      console.error('Check your email for the login link!');
    } catch (error) {
      console.error(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  console.groupEnd();

  return (
    <div data-testid="LoginForm" className="row flex flex-center">
      <div className="col-6 form-widget">
        <Heading as="h1" size="xl" color="chocolate">
          Supabase + Next.js
        </Heading>
        <p className="description">Sign in via magic link with your email below</p>
        <div>
          <input
            className="inputField"
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            className="button block"
            disabled={loading}
          >
            <span>{loading ? 'Loading' : 'Send magic link'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
