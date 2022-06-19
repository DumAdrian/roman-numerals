## Roman Numerals

https://en.wikipedia.org/wiki/Roman_numerals

### Setup
```sh
npm install
```

### Run the app
```sh
npm run app
```

### Solution
The engineering process was in steps. First, the focus was on mapping known numbers to letters. Then I noticed there are special cases
to handle, as a general rule, the representation of roman numerals are combination of some remarkable numbers like 1, 5, 10, 50, ...
The look on this conversion problem is that for every case we can just add the corresponding values for each symbol, but there are some
exceptions, for example when there is a smaller symbol before a larger one, in which case we have to substract the smaller one from the
larger one. I decided to treat those cases as one would naturally read the number, having those cases as a group of 2 characters. Because
of this, there were some edge cases, for example, when going over 3999, I had to make sure the overline is above both characters.
Vinculum addition is the extension for roman numerals to pass 3999, which is the maximum which can be represented by characters
[I, V, X, L, C, D, M]. From that point, we simply add an overline above a character to represent a value 1000 times bigger (X̅ = 10.000,
M̿ = 1000.000.000).

### Packaging layout
| Path | Description |
|---|---|
| lib | Important constants |
| routes | The defined REST API routes and their business logic |
| services | Services used by the Express application |
| tests | Application tests |
| errors | Custom errors |

### Testing
npm run test

There are 2 testing categories:
- flow test-cases which check if the request has the right format
- algorithm correctness test-cases where the flow should reach the algorithm which makes the conversion from integer to roman numerals

### Metrics/Monitoring requirements

- Docker

## Prometheus

Modify: `/prometheus-data/prometheus.yml`, replace `192.168.1.128` with your own host machine's IP.

```sh
docker run -p 9090:9090 -v ${pwd}/prometheus-data:/prometheus-data prom/prometheus --config.file=/prometheus-data/prometheus.yml
```

Open Prometheus: [http://localhost:9090](http://localhost:9090/graph)

```
sum(rate(http_request_duration_ms_count[1m])) by (service, route, method, code)  * 60
```

## Grafana

```sh
 docker run -i -p 3000:3000 grafana/grafana
 ```

 [Open Grafana: http://localhost:3000](http://localhost:3000)

```
Username: admin
Password: admin
```

### Setting datasource

Create a Grafana datasource with this settings:
+ name: DS_PROMETHEUS
+ type: prometheus
+ url: http://localhost:9090
+ access: direct (Browser)

### Setting dashboard

Grafana Dashboard to import: [/grafana-dashboard.json](/grafana-dashboard.json)
