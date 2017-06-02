import fetch from '../request';
import Effect from '../Effect';
import {ChromaInstance} from "../ChromaInstance";

function parseEffectData(effect:any, data:any){
    let jsonObj = null;
    if (effect == Effect.CHROMA_NONE) {
        jsonObj = { "effect": effect };
    } else if (effect == Effect.CHROMA_CUSTOM|| effect == Effect.CHROMA_CUSTOM2 || effect == Effect.CHROMA_CUSTOM_KEY) {
        jsonObj = { "effect": effect, "param": data };
    } else if (effect == Effect.CHROMA_STATIC) {
        var color = { "color": data };
        jsonObj = { "effect": effect, "param": color };
    }
    return jsonObj;
}


export interface IDeviceData{
    activeEffect: Effect;
    effectData: any;
    device: string;
}

export interface IDevice {
    setStatic(color: any): void;
    setAll(color: any): void;
    setNone(): void;
    activeEffect: Effect;
    effectData: any;
    device: string;
    effectId: string;
}

export default class DeviceBase implements IDevice, IDeviceData{
    device: any;
    supports: any;
    activeEffect: Effect = Effect.UNDEFINED;
    effectData: any = null;
    effectId: string = "";

    constructor(){
        this.setStatic = this.setStatic.bind(this);
        this.setDeviceEffect = this.setDeviceEffect.bind(this);
        this.setAll = this.setAll.bind(this);
        this.setNone = this.setNone.bind(this);
        this.set = this.set.bind(this);
    }

    setStatic(color: any){
        this.setDeviceEffect(Effect.CHROMA_STATIC,color);
        return this;
    }

    setAll(color: any){
        this.setStatic(color);
        return this;
    }
    
    set(){
        //console.log("Test");
    }
    
    setNone(){
        this.setDeviceEffect(Effect.CHROMA_NONE);
    }

    async setDeviceEffect(effect: Effect, data: any = null){
        this.activeEffect = effect;
        this.effectData = parseEffectData(effect, data);
    }

}