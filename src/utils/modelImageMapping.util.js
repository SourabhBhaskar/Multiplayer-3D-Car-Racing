

function modelImageMapping(models, images){
    const mapping = [];

    for(let i=0; i<models.length; i++){
      for(let j=0; j<images.length; j++){
        const modelName = models[i].name.split('.')[0].toLowerCase();
        const imageName = images[j].name.split('.')[0].toLowerCase();
        if(modelName === imageName){
            const name = models[i].name.split('.')[0].toLowerCase();
            const model = models[i].url;
            const icon = images[j].url;
            mapping.push({ name, model, icon });
          break;
        }
      }
    }
    
    return mapping;
}


export default modelImageMapping;