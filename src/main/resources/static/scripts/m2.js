/**
 * 
 */
requirejs.config({
	baseUrl: 'scripts',
	
});

requirejs(['m'],
  function (o) {
    alert(o.ddbbt);
  });

