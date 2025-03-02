import axios from 'axios';
//const useIsLoadingStore = useLoadingStore();

export const useAppStore = defineStore('app',{
    
    state:()=>({
        data:undefined,
        isLoading:false,
        isLoadingSplashScreen:true,
        defaultHostProjectApi:"http://localhost:33400",
        defaultSrcAudioApi:"http://localhost:33400/file?src="
    }),
    actions:{
        async getproject(id:any){
            //get all project from the api
            const url = `http://localhost:33400/project/${id}`;
            return new Promise<void>((resolve, reject) => {
                axios.get(`${url}`).then((res)=>{
                    console.log(res);
                    
                    if(res?.data){
                        //log
                        console.log('state projects');
                        
                        console.log('Projeto Carregado com Sucesso!');
                        console.log(res.data);
                        console.log('===== state projects =====');
                        setTimeout(()=>{
                            //isLoadingSplashScreen.msg="Projeto Carregado com sucesso!"
                            this.data = res.data;
                            this.isLoadingSplashScreen = false;
                            resolve();
                            /*
                            this.data = undefined;
                            setTimeout(()=>{
                                this.data = res.data;
                                this.isLoadingSplashScreen = false;
                                resolve();
                            },100)
                            */
                            return
                            //this.data = res.data;
                            //this.isLoadingSplashScreen = false;
                        },1000)
                        
                        //projectList=res.data;
                        //projectList.value.push(res.data);
                    }else{
                        resolve();
                    }
                }).catch(err=>{
                    //stopProgress
                    //loadingElement.off(2)
                    console.log(err)
                    
                    console.log('erro o Projeto id: '+id);
                    resolve();
                });
            })
        },
        async transcriptAudio(idProject:any,idTimeLineAudio:any,srcAudio:any){
            

            if(srcAudio){
                console.log('idProject: '+idProject);
                console.log('idTimeLineAudio: '+idTimeLineAudio);
                
                console.log(encodeURI(srcAudio));
            }
    
             //get all project from the api
             ///Rota => http://localhost:33400/project/:idProject/dataTimeLineAudio/:idTimeLineAudio/default/transcript?srcAudio=SRC\\data\\0\\timeLineAudio\\default\\0.wav
             if(srcAudio?.length > 0){
                const url = `${this.defaultHostProjectApi}/project/${idProject}/dataTimeLineAudio/${idTimeLineAudio}/default/transcript?srcAudio=${srcAudio}`;
                console.log(url);
                
                //return;
                //active isloading
                //useIsLoadingStore.status=true;
                this.isLoading=true;
                await axios.get(`${url}`).then((res)=>{
                    //desactive isloading
                    this.isLoading = false;
                    
                    console.log(res);
                    
                    //atualiza o banco atual
                    setTimeout(()=>{ this.getproject(idProject) },2000)
                    return true;
                }).catch(err=>{
                    //desactive isloading
                    this.isLoading=false;
                    //stopProgress
                    //loadingElement.off(2)
                    console.log(err)
                    
                    console.log('erro o Projeto id: '+idProject);
                    return false
                });
             }
        },
        async translate(idProject:any,idTimeLineAudio:any,to:string){// to = lang
            console.clear()
            //como se trata de traduÃ§Ã£o a propriedade default => generated
            console.log('traduzinho texto => default');
            //update data from => dataTimeLineAudio
            console.log('idProject: '+idProject);
            console.log('idTimeLine: '+idTimeLineAudio);
            console.log('selectedLanguage: '+to)
            
           
                //pegando texto que vai ser traduzido!
                const propertyValue = this.data.dataTimeLineAudio[parseInt(idTimeLineAudio.toString()) == 0 ? 0 : parseInt(idTimeLineAudio.toString())]['default'].text;
                console.log(propertyValue)
                
                
                    ///Rota => host =>  http://localhost:3000/project/:idProject/dataTimeLineAudio/:idTimeLineAudio/translate?to=en&defaultText=universo%20e%20uma%20vasta%20extensao%20de%20energia
                    const url = `${this.defaultHostProjectApi}/project/${idProject}/dataTimeLineAudio/${idTimeLineAudio}/translate?to=${to}&defaultText=${encodeURI(propertyValue)}`;
                    console.log(url);
                    //active isloading
                    //useIsLoadingStore.status=true;
                    this.isLoading=true;
                    await axios.get(`${url}`).then((res)=>{
                        //desactive isloading
                        //this.isLoading = false;
                        
                        //console.log(res);
                        
                        //atualiza o banco atual
                        setTimeout(()=>{ this.getproject(idProject) },2000);
                        setTimeout(()=>{ 
                            //desactive isloading
                            this.isLoading = false; 
                        },3000)
                        //return true;
                    }).catch(err=>{
                        //desactive isloading
                        this.isLoading=false;
                        //stopProgress
                        //loadingElement.off(2)
                        console.log(err)
                        
                        console.log('erro o Projeto id: '+idProject);
                        return false
                    });
                
                
             
        },
        async updateDataFromTimeLineAudio(idProject:any,idTimeLineAudio:any,propertyName:string){
            //atualiza o texto => text
            //propertyName => default | generated
            console.log('Propertie Name');
            
             //update data from => dataTimeLineAudio
             ///Rota => http://localhost:33400/project/:idProject/dataTimeLineAudio/:idTimeLineAudio/updatePropertie?propertyName=default&propertyValue=nasmaosDoUniverso'
             if(idProject?.toString().length > 0 && propertyName?.length > 0 ){
                if(propertyName?.indexOf('default') != -1 || propertyName?.indexOf('generated') != -1 ){
                    console.log('PropertyName: '+propertyName);
                    const propertyValue = this.data?.dataTimeLineAudio?.[idTimeLineAudio]?.[`${propertyName}`]?.text;
                    console.log('propertyValue: ',propertyValue);
                    const url = `${this.defaultHostProjectApi}/project/${idProject}/dataTimeLineAudio/${idTimeLineAudio}/updatePropertie?propertyName=${propertyName}&propertyValue=${encodeURI(propertyValue)}`;
                    console.log(url);
                    //active isloading
                //useIsLoadingStore.status=true;
                this.isLoading=true;
                await axios.get(`${url}`).then((res)=>{
                    //desactive isloading
                    
                    
                    //console.log(res);
                    
                    //atualiza o banco atual
                    setTimeout(()=>{ this.getproject(idProject) },2000);
                    setTimeout(()=>{ this.isLoading = false; },3000)
                    //return true;
                }).catch(err=>{
                    //desactive isloading
                    this.isLoading=false;
                    //stopProgress
                    //loadingElement.off(2)
                    console.log(err)
                    
                    console.log('erro o Projeto id: '+idProject);
                    return false
                });
                }
                
             }else{
                console.log('updateDataFromTimeLineAudio => ');
                console.log('PropertyName ou idProject invalido');
                
             }
        }
    }
});