// TODO
game.PlayerEntity = me.Entity.extend({
    init: function (x, y, settings){
        this._super(me.Entity, 'init', [x, y,{
            
        image: "Mario",
        spritewidth: "128",
        spriteheight: "128",
        width: 128,
        height: 128,
        getShape: function(){
            return (new me.Rect(0, 0, 128, 128)).toPolygon();
        }
        }]);
        
        this.renderable.addAnimation.("idle"), [3]);
        this.renderable.addAnimation.("smallWalk", [9, 10, 11, 12, 13, 14], 80);
        
        this.renderable.setCurrentAnimation.("idle");
        
        this.body.setVelocity(5, 20);
    },
    update: function (delta){
        if(me.input.isKeyPressed("right")){
            this.body.vel.x += this.body.accel.x * me.timer.tick;
            this.renderable.setCurrentAnimation("smallWalk");
        }
        else{
            this.body.vel.x = 0;
        }
        this.body.update(delta);
        return true;
    }
});