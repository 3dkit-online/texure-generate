
import vert from '../assets/glsl/common.vert';
import frag from '../assets/glsl/generative_random.frag';
import Base from './Base';

export default class CNoise extends Base{
    constructor(regl){
        super(regl,vert,frag)
    }

    
}

