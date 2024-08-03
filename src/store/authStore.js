import {atom, selector, useRecoilState} from 'recoil'

const authStore = atom({
    key: 'authStore',
    default: JSON.parse(localStorage.getItem("user-info"))
})

const authStoreSelector = selector({
    key: 'authStoreSelector',
    get: ({get}) => {
        const user = get(authStore);
        return user
    },
    set: ({set}, newValue)=>{
        if(newValue === null){
            localStorage.removeItem("user-info");
        }else{
            localStorage.setItem("user-info", JSON.stringify(newValue))
        }
        set(authStore, newValue)
    }
})

export const useAuthStore = () =>{
    const [user, setUser] = useRecoilState(authStoreSelector)

    const login = (user)=>{
        setUser(user)
    }
    const logout = () =>{
        setUser(null)
    }
    const saveUser = (user) =>{
        setUser(user)
    }
    return {user, login, logout, saveUser};
}