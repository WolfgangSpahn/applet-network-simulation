help:        ## Show this help.
	@grep -F "##" $(MAKEFILE_LIST) | grep -v "grep" | sed -e "s/\\$$//" -e "s/##//"

# Define source and target patterns
MD_FILES := $(wildcard *.md)
PDF_FILES := $(MD_FILES:.md=.pdf)

# Default rule
all: pdf

# PDF generation rule
pdf: $(PDF_FILES)  ## Create PDFs from MD files via Pandoc

# Pattern rule to convert each MD file to a PDF
%.pdf: %.md
	@echo "Converting $< to $@"
	pandoc $< -o $@ --pdf-engine=xelatex -f markdown+tex_math_single_backslash --highlight-style=custom.theme  \
	-V mainfont="Noto Sans" -V monofont="Fira Code" \
	-V fontsize=10pt -V geometry:margin=1in
	
