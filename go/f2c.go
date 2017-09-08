package main

import (
    gonode "github.com/jgranstrom/gonodepkg"
    json "github.com/jgranstrom/go-simplejson"
)

func main() {
	gonode.Start(process)
}

func process(cmd *json.Json) (response *json.Json) {
	response, m, e := json.MakeMap()
	if (e == nil) {
		m["c"] = (cmd.Get("f").MustFloat64() - 32.0) * 5.0 / 9.0
	}
	return
}