//adds size to the entity
game.PlayerEntity = me.Entity.extend({
    init: function (x, y, settings){
        this._super(me.Entity, 'init', [x, y,{
            
        image: "Mario",
        spritewidth: "128",
        spriteheight: "128",
        width: 128,
        height: 128,
        getShape: function(){
            return (new me.Rect(0, 0, 32, 128)).toPolygon();
        //determines hitbox of character
        }
        }]);
        //adds animations
        this.renderable.addAnimation("idle", [3]);
        this.renderable.addAnimation("smallWalk", [8, 9, 10, 11, 12, 13], 80);
        
        this.renderable.setCurrentAnimation("idle");
        
        this.body.setVelocity(5, 20);
    },
    //update function
    update: function(delta){

        if(me.input.isKeyPressed("right")){
            this.flipX(false);
            this.body.vel.x += this.body.accel.x * me.timer.tick;
            
        } else if (me.input.isKeyPressed("left")) {
        this.flipX(true);
        this.body.vel.x -= this.body.accel.x / me.timer.tick;
        
        }else{
            this.body.vel.x = 0;
        }
        this.body.update(delta);
        me.collision.check(this, true, this.collideHandler.bind(this), true);
        
        if(this.body.vel.x !==0){
            if(!this.renderable.isCurrentAnimation("smallWalk")){
            this.renderable.setCurrentAnimation("smallWalk");
        }
        }else{    
            this.renderable.setCurrentAnimation("idle");
            }
       
        this._super(me.Entity, "update", [delta]);
        return true;
        },
        
        collideHandler: function(response){
            
        }
    });
    //checks collision with "levelTrigger"
    game.levelTrigger = me.Entity.extend({
        init: function (x, y, settings){
            this._super(me.Entity, 'init', [x, y, settings]);
            this.body.onCollision = this.onCollision.bind(this);
            this.level = settings.level;
            this.xSpawn = settings.xSpawn;
            this.ySpawn = settings.ySpawn;
        },
         onCollision: function(){ 
             this.body.setCollisionMask(me.collision.types.NO_OBJECT);
             me.levelDirector.loadLevel(this.level);
             me.state.current().resetPlayer(this.xSpawn, this.ySpawn);
            // me.state.current().resetPlayer(this.xSpawn, this.ySpawn);
        }
    });
    
    game.BadGuy = me.Entity.extend({
        init: function(x, y, settings) {
            this._super(me.Entity, 'init', [x, y, {
                    image: "slime",
                    spritewidth: "60",
                    spritehieght: "28",
                    width: 60,
                    hieght: 28,
                    getShape: function() {
                        return (new me.Rect(0, 0, 60, 28)).toPolygon();
                    }
            }]);
        }
    });
  