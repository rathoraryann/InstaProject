import { atom, selector, useRecoilState } from "recoil";

const userProfileState = atom({
    key: "userProfileState",
    default: null,
})

const userProfileSelector = selector({
    key: "userProfileSelector",
    get: ({ get }) => {
        const userProfile = get(userProfileState)
        return userProfile;
    },
    set:  ({set}, newValue) => {set(userProfileState, newValue)}
})

export const useUserProfile = () => {
    const [userProfile, setUserProfileState] = useRecoilState(userProfileSelector)

    const setUserProfile = (userProfile)=>{
        setUserProfileState(userProfile)
    }
    return {userProfile, setUserProfile}
}