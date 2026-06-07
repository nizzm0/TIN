export function getCampaignWaveConfig(waveNum) {
    const configs = {
        1: {
            name: "PIERWSZY KONTAKT",
            layout: 'wedge',
            rows: ['octopus', 'octopus', 'octopus']
        },
        2: {
            name: "ZWIAD NAJEZDZCOW",
            layout: 'v_shape',
            rows: ['octopus', 'octopus', 'octopus']
        },
        3: {
            name: "ZAGESZCZENIE SZYKU",
            layout: 'split_column',
            rows: ['octopus', 'octopus', 'octopus']
        },
        4: {
            name: "KLIN OFENSYWNY",
            layout: 'wedge',
            rows: ['crab', 'octopus', 'octopus', 'octopus']
        },
        5: {
            name: "PAS ASTEROIDOW",
            layout: 'v_shape',
            rows: ['crab', 'crab', 'octopus', 'octopus']
        },
        6: {
            name: "SZACHOWNICA",
            layout: 'checkerboard',
            rows: ['crab', 'crab', 'octopus', 'octopus', 'octopus']
        },
        7: {
            name: "ROZPROSZENIE",
            layout: 'staggered',
            rows: ['crab', 'crab', 'crab', 'octopus', 'octopus']
        },
        8: {
            name: "KOLUMNA SZTURMOWA",
            layout: 'columns',
            rows: ['crab', 'crab', 'crab', 'octopus', 'octopus']
        },
        9: {
            name: "MUR GENERATOROW",
            layout: 'standard',
            rows: ['crab', 'crab', 'octopus', 'octopus']
        },
        10: {
            name: "CZYSTKA CYJANKOWA",
            layout: 'split_column',
            rows: ['squid', 'squid', 'crab', 'crab', 'octopus']
        },
        11: {
            name: "FORMACJA W",
            layout: 'v_shape',
            rows: ['squid', 'squid', 'crab', 'crab', 'octopus']
        },
        12: {
            name: "SZYK BITEWNY X",
            layout: 'checkerboard',
            rows: ['squid', 'squid', 'squid', 'crab', 'crab']
        },
        13: {
            name: "KLESZCZE BOJOWE",
            layout: 'columns',
            rows: ['squid', 'squid', 'squid', 'crab', 'crab']
        },
        14: {
            name: "FORT KOSMICZNY",
            layout: 'crown',
            rows: ['squid', 'squid', 'squid', 'crab', 'crab']
        },
        15: {
            name: "SCIANA SMUTKU",
            layout: 'standard',
            rows: ['squid', 'squid', 'squid', 'crab', 'crab']
        },
        16: {
            name: "CZERWONY SWIT",
            layout: 'split_column',
            rows: ['red', 'red', 'squid', 'squid', 'crab'],
            ufoChanceBoost: true
        },
        17: {
            name: "DRUZYNA UFO",
            layout: 'columns',
            rows: ['red', 'red', 'squid', 'squid', 'crab'],
            ufoChanceBoost: true
        },
        18: {
            name: "KORONA",
            layout: 'crown',
            rows: ['red', 'red', 'squid', 'squid', 'crab']
        },
        19: {
            name: "PIEKIELNY DESANT",
            layout: 'standard',
            rows: ['red', 'red', 'squid', 'squid', 'crab'],
            descend: 2
        },
        20: {
            name: "STATEK MATKA - BOSS",
            desc: "BOSS: Uwaga na oslony sektorowe (blokuja 80% obrazen w aktywnej strefie) oraz potrojne skosne lasery! Niszcz pojawiajace sie posilki!",
            layout: 'boss',
            rows: []
        }
    };
    return configs[waveNum] || {
        name: `FALA ${waveNum}`,
        layout: 'standard',
        rows: ['red', 'squid', 'crab', 'octopus']
    };
}

export function generateInfiniteWaveConfig(currentWave) {
    const layouts = ['standard', 'checkerboard', 'staggered', 'split_column', 'columns', 'wedge', 'v_shape'];
    const layout = layouts[Math.floor(Math.random() * layouts.length)];

    const rows = [];
    const numRows = 5;
    for (let r = 0; r < numRows; r++) {
        if (currentWave <= 2) {
            rows.push('octopus');
        } else if (currentWave <= 5) {
            rows.push(r <= 1 ? 'crab' : 'octopus');
        } else if (currentWave <= 8) {
            rows.push(r === 0 ? 'squid' : (r <= 2 ? 'crab' : 'octopus'));
        } else if (currentWave <= 12) {
            rows.push(r <= 1 ? 'squid' : 'crab');
        } else {
            rows.push(r <= 1 ? 'red' : (r <= 3 ? 'squid' : 'crab'));
        }
    }

    return {
        layout,
        rows
    };
}
