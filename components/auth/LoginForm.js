'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation'; // Sử dụng useRouter thay vì useNavigate/useLocation
import { icons } from '../../assets/icons/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useUser } from '../../utils/hooks/useUser';

function Login() {
  const router = useRouter(); // Khởi tạo useRouter
  const { login } = useUser();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (loginData) => {
    const user = await login(loginData);
    if (user) {
      router.push('/account'); // Sử dụng router.push để điều hướng
    }
  };

  return (
    <div className='login'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className='input-label'>
          Email
          <div className='input-wrapper'>
            <FontAwesomeIcon icon={icons.email}></FontAwesomeIcon>
            <input type="text" {...register("email", { required: true })} />
          </div>
        </label>
        {errors.email && <span>This field is required</span>}
        <label className='input-label'>
          Password
          <div className='input-wrapper'>
            <FontAwesomeIcon icon={icons.lock}></FontAwesomeIcon>
            <input type="password" {...register("password", { required: true })} />
          </div>
        </label>
        {errors.password && <span>This field is required</span>}
        <button type="submit">LOGIN</button>
      </form>
    </div>
  );
}

export default Login;
