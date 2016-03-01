/**
 * TypeScript implementation for this:
 * https://github.com/squarefeet/THREE.TargetCamera
 */

import { Viewport } from "../Types/Types";

type TargetSettings = {
    name?: string,
    targetObject?: THREE.Object3D,
    cameraPosition?: THREE.Vector3,
    cameraRotation?: any, // who knows, number maybe?
    fixed?: boolean,
    stiffness?: number,
    matchRotation?: boolean
}


class Camera extends THREE.PerspectiveCamera {
    
    public targets: Object;
    public targetOrder: Array<any>;
    public currentTargetName: string;
    private idealObject: THREE.Object3D;
    private isTransitioning: boolean;
    private defaults: TargetSettings;
    
    constructor(config: Viewport) {
        super(
            config.FOV,
            config.ASPECT_RATIO,
            config.NEAR,
            config.FAR
        );
        
        this.targets = {};
        this.targetOrder = [];
        this.currentTargetName = null;
        this.idealObject = new THREE.Object3D();
        this.isTransitioning = false;
        
        this.defaults = {
            name: null,
            targetObject: new THREE.Object3D(),
            cameraPosition: new THREE.Vector3(0, 30, 50),
            cameraRotation: undefined,
            fixed: false,
            stiffness: 0.4,
            matchRotation: true
        }
        
        this.updateProjectionMatrix();
    }
    
    
    private translateIdealObject(vec: THREE.Vector3): void {
        let obj = this.idealObject;
        
        if( vec.x !== 0 ) obj.translateX(vec.x);
        if( vec.y !== 0 ) obj.translateY(vec.y);
        if( vec.z !== 0 ) obj.translateZ(vec.z);
    }
    
    
    private createNewTarget(): TargetSettings {
        let defaults = this.defaults;

        return {
            name: defaults.name,
            targetObject: defaults.targetObject,
            cameraPosition: defaults.cameraPosition,
            cameraRotation: defaults.cameraRotation,
            fixed: defaults.fixed,
            stiffness: defaults.stiffness,
            matchRotation: defaults.matchRotation
        };
    }
    
    
    private determineCameraRotation(rotation: THREE.Euler | THREE.Quaternion): THREE.Quaternion {
        let ret = null;
        
        if(rotation instanceof THREE.Euler) 
            ret = new THREE.Quaternion().setFromEuler(rotation);
        else
            ret = rotation;
            
        return ret;
    }
    
    
    public addTarget(settings: TargetSettings): void {
        var target = this.createNewTarget();
        
        for(var prop in settings) {
            if(target.hasOwnProperty(prop)) {
                if(prop === 'cameraRotation') 
                    target[prop] = this.determineCameraRotation(settings[prop]);
                else
                    target[prop] = settings[prop];
                
            }
        }
        
        this.targets[settings.name] = target;
        this.targetOrder.push(settings.name);
    }
    
    
    public setTarget(name: string): void {
        if(this.targets.hasOwnProperty(name))
            this.currentTargetName = name;
        else
            console.warn(`Camera.setTarget: No target with name: ${name}`);
    }
    
    
    public removeTarget(name: string): void {
        let targets = this.targets;
        let targetOrder = this.targetOrder;

        if(targetOrder.length === 1) {
            console.warn( 'Camera: Will not remove only existing camera target.' );
        } else if(targets.hasOwnProperty(name)) {
            targetOrder.splice( targetOrder.indexOf(name), 1);
            targets[name] = null;
        }

        this.setTarget(targetOrder[targetOrder.length - 1])
    }
    
    public update(): void {
        let target = this.targets[this.currentTargetName];
        let ideal = this.idealObject;

        if(!target) return;

        if(!target.fixed) {
            ideal.position.copy( target.targetObject.position );
            ideal.quaternion.copy( target.targetObject.quaternion );

            if(target.cameraRotation !== undefined) 
                ideal.quaternion.multiply( target.cameraRotation );
            

            this.translateIdealObject( target.cameraPosition );
            this.position.lerp( ideal.position, target.stiffness );

            if(target.matchRotation)
                this.quaternion.slerp(ideal.quaternion, target.stiffness);
            else 
                this.lookAt( target.targetObject.position );
            
        } else {
            this.position.copy(target.cameraPosition);
            this.lookAt(target.targetObject.position);
        }
    }
}

export { Camera }