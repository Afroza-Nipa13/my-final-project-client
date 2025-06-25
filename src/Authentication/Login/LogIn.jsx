import React from 'react';
import { useForm } from 'react-hook-form';
import SocialLogin from '../SocialLogin';
import useAuth from '../../Hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const LogIn = () => {
    const { signInUser } = useAuth();
    const { register, handleSubmit,
        formState: { errors }
    } = useForm()

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';
    console.log(location.state)
    const onSubmit = data => {
        console.log(data)
        signInUser(data.email, data.password).then(result => {
            console.log(result)
            Swal.fire({
                icon: 'success',
                title: 'Login Successful!',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
               console.log(from) 
                navigate(from, { replace: true });
            });
        }).catch(error => {
            console.log(error.message)
        })


    }
    return (
        <div className='card-body'>
            <h2 className='card-title text-primary font-bold text-4xl'>Welcome Back</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="fieldset">
                    <label className="label">Email</label>
                    <input
                        type="email"
                        {...register('email')}
                        className="input w-full" placeholder="Email" />
                    <label className="label">Password</label>
                    <input
                        type="password"
                        {...register('password',
                            {
                                required: true,
                                minLength: 6
                            })}
                        className="input w-full"
                        placeholder="Password" />
                    {errors.password?.type === "required" &&
                        <p className='text-red-600' role="alert">"password is required"</p>}
                    {errors.password?.type === "minLength" &&
                        <p className='text-red-600' role="alert">"password is must be 6 characters or longer.."</p>}
                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn btn-neutral mt-4">Login</button>
                    <p>New to our website? please <Link to='/register' className='link link-error'>Register</Link></p>
                </fieldset>
            </form>

            <div className='divider mb-4'>OR</div>
            <div className='w-full text-center'>
                <SocialLogin></SocialLogin>
            </div>
        </div>
    );
};

export default LogIn;