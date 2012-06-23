install:
		@bin/app install "$@"

test:
		@bin/app test "$@"

.PHONY: install test
