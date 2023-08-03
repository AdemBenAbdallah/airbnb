'use client'

import { AiFillGithub } from "react-icons/ai"
import { FcGoogle } from 'react-icons/fc'
import { useCallback, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { useQuery } from 'react-query';
import useRegisterModel from "@/app/hooks/useRegisterModel"
import axios from "axios"
import Modal from "./Modal"


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
        console.log(err)
      })
      .finally(() =>  {
        setIsLoading(false)
      })
  }
  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModel.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModel.onClose}
      onSubmit={handleSubmit(onSubmit)}
    />
  )
}

export default RegisterModel