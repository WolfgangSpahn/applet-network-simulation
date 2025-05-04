help:        ## Show this help.
	@grep -F "##" $(MAKEFILE_LIST) | grep -v "grep" | sed -e "s/\\$$//" -e "s/##//"

install:     ## Install library dependencies.
	npm install

build:       ## Build the library.
	npm run build


dev:         ## Start the development server.
	npm run dev

manuals:    ## Build the manual.
	cd manuals && \
	make pdf