import { ReactNode, memo, useCallback, useMemo } from 'react'

import { Tabs } from 'antd'

import { AuthType } from '../../model/consts/authConsts'

export interface TabItem {
    value: string
    content: ReactNode
}

interface AuthTypeTabsProps {
    className?: string
    value: AuthType
    onChangeType: (type: AuthType) => void
}

export const AuthTypeTabs = memo((props: AuthTypeTabsProps) => {
    const { className, onChangeType, value } = props

    const typeTabs: TabItem[] = useMemo(
        () =>
            Object.values(AuthType).map((type) => ({
                value: type,
                content: type as ReactNode,
            })),
        [],
    )

    const onTabClick = useCallback(
        (tab: string) => {
            console.log(tab)

            onChangeType(tab as AuthType)
        },
        [onChangeType],
    )

    return (
        <Tabs
            defaultActiveKey="1"
            type="card"
            size="middle"
            items={typeTabs.map((tab) => {
                return {
                    label: tab.content,
                    key: tab.value,
                }
            })}
            onChange={onTabClick}
        />
    )
})
