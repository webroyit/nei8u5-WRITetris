class Events{
    constructor(){
        this._listeners = new Set;
    }

    listen(name, callback){
        this._listeners.add({
            name,
            callback
        })
    }

    // ...data is same as data[0], data[1], data[2]
    emit(name, ...data){
        this._listeners.forEach(listener => {
            if(listener.name === name){
                listener.callback(...data);
            }
        })
    }
}