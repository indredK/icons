import { dest, src } from 'gulp';
import rename from 'gulp-rename';
import SVGO from 'svgo';
import { svg2Definition, svgo, useTemplate } from '../../plugins';
import { SVG2DefinitionOptions } from '../../plugins/svg2Definition';
import { UseTemplatePluginOptions } from '../../plugins/useTemplate';

export interface GenerateIconsOptions
  extends SVG2DefinitionOptions,
    UseTemplatePluginOptions {
  from: string[];
  toDir: string;
  svgoConfig: SVGO.Options;
  filename: (option: { name: string }) => string;
  optimizePath?: boolean;
}

export const generateIcons = ({
  from,
  toDir,
  svgoConfig,
  theme,
  extraNodeTransformFactories,
  stringify,
  template,
  mapToInterpolate,
  filename,
  optimizePath = true
}: GenerateIconsOptions) =>
  function GenerateIcons() {
    return src(from)
      .pipe(svgo(svgoConfig, optimizePath))
      .pipe(
        svg2Definition({
          theme,
          extraNodeTransformFactories,
          stringify
        })
      )
      .pipe(useTemplate({ template, mapToInterpolate }))
      .pipe(
        rename((file) => {
          if (file.basename) {
            file.basename = filename({ name: file.basename });
            file.extname = '.ts';
          }
        })
      )
      .pipe(dest(toDir));
  };
