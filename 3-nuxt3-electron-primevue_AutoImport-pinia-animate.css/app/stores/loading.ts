export const useLoadingStore = defineStore('loading',{
    state:()=>({
        isLoading:true,
    }),
    actions:{
        toggleIsLoading(){
            this.isLoading = !this.isLoading;
        },
        setIsLoading(isLoading:boolean){
            this.isLoading = isLoading;
        },
        resetIsLoading(){
            this.isLoading = true;
        }
    }
})
