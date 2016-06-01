# _data structure 

As _data is a place to store mock data, each service will have a file inside of this folder.
in a `<service-name>.json` file with following format, mock data of a service should be defined:


```
{
	<module-name>: {
		<method-name>: {
			<mock-data-here>
		},
		<method-name>: {
			<mock-data-here>
		},
		... 
	},
	<module-name>: {
		<method-name>: {
			<mock-data-here>
		},
		... 
	},
	... 
} 
  
```