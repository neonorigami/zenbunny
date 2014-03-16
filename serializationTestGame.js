Prefab.create("Test")
	.withProperty( "hello", "World" )
	.withProperty( "pos", { x:0, y:0 } )
	.withBehavior( "TestBehavior01" )
		.withState( "LivingState" )
			.withEventHandler( "awake", function( context ) {
			})
			.withEventHandler( "mooCowMoo", function( context ) {
			})
			.withEventHandler( "die", function( context ) {
			})
		.withState( "DeadState" )
			.withEventHandler( "reborn", function( context ) {
			})
	.withBehavior( "TestBehavior02" )
		.withState( "NoStates" )
			.withEventHandler( "awake", function( context ) {
			})
;

console.log( Prefab.ToJson( "Test" ) );