# Node.js Cli Command Line

That is a simple Nodejs commando line created during the NodeBr course. With it, at the command line, you can create, read, update and delete Heroes and their powers.

## Usage

### Installing

```
	git clone [current url]
	cd folder-destination
	npm install
	npm start
```

### Examples

**To create a Hero, use:**

```
node index.js --register  --name [value] --power [value]
```

Ex.:

```
node index.js --register  --name Hulk --power Force
```

**To show Heroes, use:**

```
node index.js --show
```

**To delete a Hero, use:**

```
node index.js --delete --id [value]
```

Ex.:

```
node index.js --delete --id 102530
```

**To update a Hero, use:**

```
node index.js --update [value] --name [value] --power [value]
```

Name and power are optional. You can edit only one of the attributes.
Ex.:

```
node index.js --update 102530 --name Batman --power Money
node index.js --update 102530 --power Intellect
```
