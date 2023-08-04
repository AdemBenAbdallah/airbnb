'use client'

import { AiFillGithub } from "react-icons/ai"
import { FcGoogle } from 'react-icons/fc'
import { useCallback, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import useRegisterModel from "@/app/hooks/useRegisterModel"
import axios from "axios"
import Modal from "./Modal"
import Heading from "../Heading"
import Input from '../inputs/Input'
import { toast } from "react-hot-toast"
import Button from "../Button"


const RegisterModel = () => {
  const registerModel = useRegisterModel()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    axios.post('/api/register', data)
      .then(() => {
        registerModel.onClose()
      })
      .catch((err) => {
        toast.error('somthing wrong')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title='Welcome to Airbnb' subtitle="Create an account!" />
      <Input
        id='email'
        Label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='name'
        Label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='password'
        type="password"
        Label="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        disabled
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => { }}
      />
      <Button
        outline
        disabled
        label="Continue with Google"
        icon={AiFillGithub}
        onClick={() => { }}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex flex-row justify-center items-center gap-2">
          <div>
            Already have an account?
          </div>
          <div
            onClick={registerModel.onClose}
            className="text-neutral-500 cursor-pointer hover-underline">
            Log in
          </div>
        </div>
      </div> 
    </div>
  )
  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModel.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModel.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default RegisterModel