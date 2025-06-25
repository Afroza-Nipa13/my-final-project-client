import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import SocialLogin from '../SocialLogin';
import { Link } from 'react-router';

const Register = () => {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const { createUser } = useAuth()
    const onSubmit = data => {
        console.log(data)
        createUser(data.email, data.password).then(result => {
            console.log(result)
        }).catch(error => {
            console.log(error)
        })
    }
    return (
        <div className='card-body'>
            <h2 className='card-title text-primary font-bold text-4xl'>Create an account</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="fieldset">
                    <label className="label">Email</label>
                    <input
                        type="email"
                        {...register('email')}
                        className="input w-full" placeholder="Email" />
                    {errors.email?.type === "required" &&
                        <p className='text-red-600' role="alert">"Email is required"</p>}
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
                    <p>Already have an account? please <Link to='/login' className='link link-error'>Login</Link></p>
                </fieldset>
            </form>
            <div className='divider mb-4'>OR</div>
            <div className='w-full text-center'>
                <SocialLogin></SocialLogin>
            </div>
        </div>
    );
};

export default Register;