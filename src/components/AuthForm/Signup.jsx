import React, { useState } from 'react'
import { Alert, AlertIcon, Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
// import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import  useSignUpWithEmailAndPassword  from '../../hooks/useSignUpWithEmailAndPassword'

const Signup = () => {
    // const [showPassword, setShowPassword] = useState(false)
    const [inputs, setInputs] = useState({
        fullName: '',
        username: '',
        email: '',
        password: '',
    })
    const {loading, error, signup} = useSignUpWithEmailAndPassword()
    return (
        <>
            <Input
                placeholder='Email'
                fontSize={14}
                size={'sm'}
                type='email'
                value={inputs.email}
                onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            />
            <Input
                placeholder='Username'
                fontSize={14}
                size={'sm'}
                type='text'
                value={inputs.username}
                onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
            />
            <Input
                placeholder='Full Name'
                fontSize={14}
                size={'sm'}
                type='text'
                value={inputs.fullName}
                onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
            />
            <InputGroup>
                <Input
                    placeholder='Password'
                    fontSize={14}
                    size={'sm'}
                    type='password'
                    // type={showPassword ? "text" : 'password'}
                    value={inputs.password}
                    onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                />
                {/* <InputRightElement h='full'>
                    <Button variant={'ghost'} size={'sm'} onClick={()=>setShowPassword(!showPassword)}>
                        {showPassword ? <ViewIcon/> : <ViewOffIcon/>}
                    </Button>
                </InputRightElement> */}
            </InputGroup>

            {error && (
                <Alert status='error' fontSize={13} borderRadius={4}>
                    <AlertIcon fontSize={12} />{error.message}
                </Alert>

            )}

            <Button w={'full'} colorScheme='blue' size={'sm'} fontSize={14}
            isLoading={loading}
            onClick={()=>signup(inputs)}
            >Sign up</Button>
        </>
    )
}

export default Signup
