declare module "splitting" {
  type SplittingOptions = {
    target?: string | Element | NodeList | Element[];
    by?: "chars" | "words" | "lines" | "items" | string;
    key?: string;
    matching?: string;
  };
  type SplittingResult = unknown[];
  interface SplittingFn {
    (opts?: SplittingOptions): SplittingResult;
  }
  const Splitting: SplittingFn;
  export default Splitting;
}
