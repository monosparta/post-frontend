env:=$(subst . ,.,$(shell echo `git branch --show-current`|sed "s/env\///"))

package:
	- mkdir -p dest/${env}
	- rm dest/${env}/*
	yarn install
	npm run build -- --mode production
	- rm monochrome-admin.zip

	zip -r monochrome-admin.zip ./dist

	cp -f monochrome-admin.zip dest/${env}/latest.zip
	cp -f dest/${env}/latest.zip dest/${env}/`date +'%Y-%m-%d'`.zip

upload-s3:
	op run --env-file=./aws-prov.env -- aws s3 sync ./dest/${env} s3://trunksys-projects/monospace/monochrome-admin/${env}/

package-and-upload-s3:
	make package
	make upload-s3

