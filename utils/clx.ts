//

// Like utility named as "clsx", mentioned [here](https://material-ui.com/getting-started/faq/#whats-the-clsx-dependency-for).
// @see https://github.com/lukeed/clsx
export const clx = (...fields: (string | boolean | undefined)[]) => fields.filter(t => Boolean(t)).join(' ');
