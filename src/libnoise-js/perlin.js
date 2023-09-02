class Perlin {

    static DEFAULT_PERLIN_FREQUENCY = 1.0;
    static DEFAULT_PERLIN_LACUNARITY = 2.0;
    static DEFAULT_PERLIN_OCTAVE_COUNT = 6;
    static DEFAULT_PERLIN_PERSISTENCE = 0.5;
    static DEFAULT_PERLIN_QUALITY = NoiseUtil.NoiseQuality.QUALITY_STD;
    static DEFAULT_PERLIN_SEED = 0;
    static PERLIN_MAX_OCTAVE = 30;

    frequency = Perlin.DEFAULT_PERLIN_FREQUENCY;
    lacunarity = Perlin.DEFAULT_PERLIN_LACUNARITY;
    noiseQuality = Perlin.DEFAULT_PERLIN_QUALITY;
    octaveCount = Perlin.DEFAULT_PERLIN_OCTAVE_COUNT;
    persistence = Perlin.DEFAULT_PERLIN_PERSISTENCE;
    seed = Perlin.DEFAULT_PERLIN_SEED;

    getSourceModuleCount() {
        return 0;
    }

    getValue(x, y, z) {
        var value = 0.0;
        var signal = 0.0;
        var curPersistence = 1.0;
        var nx, ny, nz;
        var seed;

        x *= this.frequency;
        y *= this.frequency;
        z *= this.frequency;

        for (let curOctave = 0; curOctave < this.octaveCount; curOctave++) {

            // Make sure that these floating-point values have the same range as a 32-
            // bit integer so that we can pass them to the coherent-noise functions.
            nx = NoiseUtil.MakeInt32Range(x);
            ny = NoiseUtil.MakeInt32Range(y);
            nz = NoiseUtil.MakeInt32Range(z);

            // Get the coherent-noise value from the input value and add it to the
            // final result.
            seed = ((this.seed + curOctave) & 0xffffffff);
            signal = NoiseUtil.GradientCoherentNoise3D(nx, ny, nz, seed, this.noiseQuality);
            value += signal * curPersistence;

            // Prepare the next octave.
            x *= this.lacunarity;
            y *= this.lacunarity;
            z *= this.lacunarity;
            curPersistence *= this.persistence;
        }
        return value;
    }
}