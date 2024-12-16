import { CheckCircleOutlined, PauseCircleOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'

import { getUserAuthData } from '@/entities/User'
import { getRouteTodo, getRouteTodoCompleted } from '@/shared/const/router'

import { SidebarItemType } from '../types/sidebar'

export const useSidebarItems = () => {
    const userData = useSelector(getUserAuthData)
    const sidebarItemsList: SidebarItemType[] = [
        {
            id: '1',
            path: getRouteTodo(),
            Icon: CheckCircleOutlined,
            text: 'Все задания',
        },
        {
            id: '2',
            path: getRouteTodoCompleted(),
            Icon: PauseCircleOutlined,
            text: 'Завершенные',
        },
    ]

    return sidebarItemsList
}
