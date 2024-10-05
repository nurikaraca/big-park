import { create } from 'zustand';

type State = {
    jwt: string;
    loader: boolean;
  }

  type Actions = {
    setLoader: (loader: boolean) => void;
    setJwt: (jwt: string) => void;
  }

const useAuthStore = create<State & Actions>((set)=>({
    jwt:"",
    loader:false,
    setLoader:(loader)=>set({loader}),
    setJwt:(jwt)=>set({jwt}),
}))

export default useAuthStore