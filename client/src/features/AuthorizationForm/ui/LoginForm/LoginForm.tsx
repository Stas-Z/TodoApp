import { MutableRefObject, memo, useCallback, useEffect, useRef } from 'react'

import { Button, Input, Space, Typography } from 'antd'
import { useSelector } from 'react-redux'

import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'

import cls from './LoginForm.module.scss'
import { AuthType } from '../../model/consts/authConsts'
import { getLoginState } from '../../model/selectors/getLoginState/getLoginState'
import { authByEmail } from '../../model/services/authByEmail/authByEmail'
import { regByEmail } from '../../model/services/regByEmail/regByEmail'
import { regActions } from '../../model/slice/regSlice'
import { AuthTypeTabs } from '../AuthTypeTabs/AuthTypeTabs'

export interface LoginFormProps {
    className?: string
    onSuccess?: () => void
}

const { Text } = Typography

const LoginForm = (props: LoginFormProps) => {
    const { className, onSuccess } = props

    const dispatch = useAppDispatch()

    const { email, password, isLoading, error, succes, view } =
        useSelector(getLoginState)

    const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>

    const onChangeEmail = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(regActions.setUsername(e.target.value))
        },
        [dispatch],
    )

    const onChangePassword = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(regActions.setPassword(e.target.value))
        },
        [dispatch],
    )

    const onButtonClickHandler = useCallback(async () => {
        if (view === AuthType.REG) {
            const result = await dispatch(regByEmail({ password, email }))
            if (result.meta.requestStatus === 'fulfilled') {
                timerRef.current = setTimeout(() => {
                    dispatch(authByEmail({ password, email }))
                    onSuccess?.()
                }, 1000)
            }
        }
        if (view === AuthType.AUTH) {
            const result = await dispatch(authByEmail({ password, email }))
            if (result.meta.requestStatus === 'fulfilled') {
                timerRef.current = setTimeout(() => {
                    onSuccess?.()
                }, 1000)
            }
        }
    }, [view, dispatch, password, email, onSuccess])

    const onChangeHandler = (view: AuthType) => {
        dispatch(regActions.setView(view))
    }

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                onButtonClickHandler()
            }
        },
        [onButtonClickHandler],
    )
    useEffect(() => {
        window.addEventListener('keydown', onKeyDown)

        return () => {
            window.removeEventListener('keydown', onKeyDown)
        }
    }, [onKeyDown])

    const errorMessage = <Text type="danger">{error}</Text>
    const succesMessage = <Text type="success">{succes}</Text>
    const buttonText = view === AuthType.AUTH ? 'Войти' : 'Зарегистрировать'

    return (
        <div className={classNames(cls.loginForm, {}, [className])}>
            <AuthTypeTabs value={view} onChangeType={onChangeHandler} />
            <Space direction="vertical" size="large">
                {error && errorMessage}
                {succes && succesMessage}
                <Input
                    autoFocus
                    type="text"
                    className={cls.input}
                    placeholder="Введите ваш email"
                    onChange={onChangeEmail}
                    value={email}
                    size="large"
                />
                <Input.Password
                    className={cls.input}
                    placeholder="Введите ваш пароль"
                    onChange={onChangePassword}
                    value={password}
                    size="large"
                />
                <Button
                    onClick={onButtonClickHandler}
                    loading={isLoading}
                    type="primary"
                    block
                    size="large"
                >
                    {buttonText}
                </Button>
            </Space>
        </div>
        // <VStack
        //     gap="16"
        //     align="center"
        //     className={classNames(cls.loginForm, {}, [className])}
        // >
        //     <VStack gap="16" max align="center">
        //         <AppLogo width={100} height={49} />

        //         <AuthTypeTabs value={view} onChangeType={onChangeHandler} />
        //     </VStack>
        //     {error && errorMessage}
        //     {succes && succesMessage}
        //     <VStack gap="8" max>
        //         <Input
        //             autoFocus
        //             type="text"
        //             className={cls.input}
        //             placeholder={t('Enter your email')}
        //             size="l"
        //             onChange={onChangeEmail}
        //             value={email}
        //         />
        //         <Input
        //             type="password"
        //             className={cls.input}
        //             placeholder={t('Password')}
        //             size="l"
        //             onChange={onChangePassword}
        //             value={password}
        //         />
        //     </VStack>

        //     <Button
        //         onClick={onButtonClickHandler}
        //         variant="filled"
        //         color="yellow"
        //         className={cls.loginBtn}
        //         fullWidth
        //         size="l"
        //         disabled={isLoading}
        //         shadow
        //         round
        //         isLoading={isLoading}
        //     >
        //         {buttonText}
        //     </Button>
        // </VStack>
    )
}

export default memo(LoginForm)
