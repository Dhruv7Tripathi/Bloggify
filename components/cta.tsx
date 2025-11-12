import { Check } from "lucide-react";
import Link from "next/link";

interface Cta4Props {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  items?: string[];
}

const defaultItems = [
  "Easy Integration",
  "24/7 Support",
  "Customizable Design",
  "Scalable Performance",
  "Hundreds of Blocks",
];

export const Cta4 = ({
  title = "Bloggify Made Easy",
  description = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto illo praesentium nisi, accusantium quae.",
  buttonText = "Get Started",
  buttonUrl = "/https://dhruvtripathi.in",
  items = defaultItems,
}: Cta4Props) => {
  return (
    <section className="py-16 dark:bg-black bg-white sm:py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-6 sm:gap-8 rounded-lg border border-dashed border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-black py-8 px-4 sm:py-10 sm:px-6 lg:py-16 lg:px-16 lg:ml-20 lg:mr-20">

          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h4 className="mb-4 text-2xl sm:text-3xl lg:text-4xl font-bold text-black dark:text-white leading-tight">
              {title}
            </h4>
            <p className="text-muted-foreground text-sm sm:text-base lg:text-base max-w-prose mx-auto lg:mx-0 leading-relaxed">
              {description}
            </p>

            <Link
              href={buttonUrl}
              className="group w-full sm:w-48 lg:w-40 mt-6 flex items-center justify-center gap-2 rounded-xl border border-neutral-300 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-950 px-5 py-3 sm:py-4 lg:py-3 text-sm sm:text-base lg:text-sm font-semibold text-black dark:text-white shadow-[inset_0px_0px_7px_1px_#535353] transition-all duration-300 hover:bg-neutral-200 dark:hover:bg-neutral-800/50 touch-manipulation mx-auto lg:mx-0"
            >
              <TextGlitch text={buttonText} />
            </Link>
          </div>

          <div className="w-full lg:max-w-fit flex justify-center lg:justify-end items-start mt-6 lg:mt-0">
            <ul className="flex flex-col space-y-3 sm:space-y-2 text-sm sm:text-base font-medium text-black dark:text-white w-full max-w-xs lg:max-w-none">
              {items.map((item, idx) => (
                <li className="flex items-center justify-center lg:justify-start" key={idx}>
                  <Check className="mr-3 sm:mr-4 size-4 sm:size-5 flex-shrink-0 text-green-500" />
                  <span className="text-center lg:text-left">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

function TextGlitch({ text }: { text: string }) {
  return (
    <div className="relative overflow-hidden">
      <span className="invisible">{text}</span>
      <span className="absolute left-0 top-0 font-semibold transition-transform duration-500 ease-in-out hover:duration-300 group-hover:-translate-y-full">
        {text}
      </span>
      <span className="absolute left-0 top-0 translate-y-full font-semibold transition-transform duration-500 ease-in-out hover:duration-300 group-hover:translate-y-0">
        {text}
      </span>
    </div>
  );
}