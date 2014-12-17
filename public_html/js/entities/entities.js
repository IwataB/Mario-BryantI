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
        if (me.input.isKeyPressed('left')) {
      // flip the sprite on horizontal axis
      this.flipX(true);
      // update the entity velocity
      this.body.vel.x -= this.body.accel.x * me.timer.tick;
      // change to the walking animation
      if (!this.renderable.isCurrentAnimation("smallWalk")) {
        this.renderable.setCurrentAnimation("smallWalk");
      }
    } else if (me.input.isKeyPressed('right')) {
      // unflip the sprite
      this.flipX(false);
      // update the entity velocity
      this.body.vel.x += this.body.accel.x * me.timer.tick;
      // change to the walking animation
      if (!this.renderable.isCurrentAnimation("smallWalk")) {
        this.renderable.setCurrentAnimation("smallWalk");
      }
    } else {
      this.body.vel.x = 0;
      // change to the standing animation
      this.renderable.setCurrentAnimation("idle");
    }
   
    if (me.input.isKeyPressed('jump')) {
      // make sure we are not already jumping or falling
      if (!this.body.jumping && !this.body.falling) {
        // set current vel to the maximum defined value
        // gravity will then do the rest
        this.body.vel.y = -this.body.maxVel.y * me.timer.tick;
        // set the jumping flag
        this.body.jumping = true;
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
        //handles "badguy" spawning
            this.spritewidth = 60;
            var width = settings.width
            x = this.pos.x;
            this.startX = x;
            this.endX = x + width - this.spritewidth;
            this.pos.x = x + width - this.spritewidth;
            this.updateBounds();
            //handles "badguy" updating
            this.alwaysUpdate = true;
            //sets the "badguy"s typing, declares it is alive, and prevents from walking left
            this.walkLeft = false;
            this.alive = true;
            this.type = "badguy"
            
            
            //sets "badguy"s velocity
            this.body.setVelocity(4, 6);
            
        },
        
        update:function(delta){
            this.body.update(delta);
            this.collision.check(this, true, this.collideHandler.bind(this), true)
            
            this._super(me.Entity, "update", [delta]);
        },
        //handles collision with "badguy"
        collideHandler:function(){
            
            if(this.alive){
                if(this.walkLeft && this.pos.x <= this.startX){
                    this.walkLeft = false;
                }
            }
            //removes "badguy" when it dies
            else{
                me.game.world.removeChild(this);
            }
            
            
        }
        
    }); 