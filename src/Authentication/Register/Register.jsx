import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import SocialLogin from '../SocialLogin';
import { Link, useLocation, useNavigate } from 'react-router';
import axios from 'axios';
import useAxios from '../../Hooks/useAxios';

const Register = () => {
    const [uploadImage, setUploadImage] = useState('')
    const { handleSubmit, register, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useAuth()
    const axiosInstance = useAxios()
     const location = useLocation();
        const navigate = useNavigate();
        const from = location.state?.from || '/';
    const onSubmit = data => {
        console.log(data)
        createUser(data.email, data.password).then(async(result) => {
            console.log(result)
            // update profile to db
            const userInfo={
                email: data.email,
                role: "user",
                createdAt:new Date().toISOString(),
                lastLogIn: new Date().toISOString()

            }
            const userResponse =await axiosInstance.post('/users', userInfo)
            console.log(userResponse.data)

            // update image to firebase
            const userProfile = {
                displayName: data.name,
                photoURL: uploadImage
            }
            updateUserProfile(userProfile)
                .then(() => {
                    console.log("profile updated")
                    navigate(from)

                }).catch((error) => {
                    console.log(error)
                })


        }).catch(error => {
            console.log(error)
        })
    }
    // VITE_ImgBB_Api_Key
    const handleImageUpload = async (e) => {
        e.preventDefault()
        const image = e.target.files[0];
        const formData = new FormData()
        formData.append("image", image)
        const imgUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_ImgBB_Api_Key}`;

        const response = await axios.post(imgUploadUrl, formData)
        setUploadImage(response.data.data.url)


    }
    return (
        <div className='card-body'>
            <h2 className='card-title text-primary font-bold text-4xl'>Create an account</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="fieldset">

                    {/* name */}
                    <label className="label">Name</label>
                    <input
                        type="text"
                        {...register('name')}
                        className="input w-full" placeholder="Your name" />
                    {errors.name?.type === "required" &&
                        <p className='text-red-600' role="alert">"Name is required"</p>}
                    {/* photo */}
                    <label className="label">Photo</label>
                    <input
                        onChange={handleImageUpload}
                        type="file"
                        className='btn btn-primary text-black'
                        placeholder='your profile picture'

                    />
                    {/* email */}
                    <label className="label">Email</label>
                    <input
                        type="email"
                        {...register('email')}
                        className="input w-full" placeholder="Email" />
                    {errors.email?.type === "required" &&
                        <p className='text-red-600' role="alert">"Email is required"</p>}
                    {/* password */}
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

                    <button className="btn btn-neutral mt-4">Create Now</button>
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