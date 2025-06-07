import Link from "next/link"
import { ArrowLeft, FileText, Scale } from "lucide-react"
import { Button } from "@/components/ui/button"
export default function TermsOfService() {
  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-background to-muted/30">
        <div aria-hidden className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-6">
            {/* Header */}
            <div className="text-center mb-12">
              <Button variant="outline" asChild className="mb-6">
                <Link href="/" className="flex items-center gap-2">
                  <ArrowLeft className="size-4" />
                  Back to Home
                </Link>
              </Button>

              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                  <Scale className="size-6 text-primary" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  Terms of Service
                </h1>
              </div>

              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Please read these terms carefully before using Bloggify. By accessing our platform, you agree to be
                bound by these terms.
              </p>

              <div className="mt-6 text-sm text-muted-foreground">
                <span className="font-medium">Last updated:</span> December 7, 2024
              </div>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <div className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-xl p-8 space-y-8">
                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <FileText className="size-5 text-primary" />
                    1. Acceptance of Terms
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    By accessing and using Bloggify, you accept and agree to be bound by the terms and
                    provision of this agreement. If you do not agree to abide by the above, please do not use this
                    service.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">2. Description of Service</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Bloggify is a web-based blogging platform that allows users to create, publish, and manage blog
                    content. The service includes:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                    <li>Blog creation and management tools</li>
                    <li>Content publishing and editing features</li>
                    <li>User profile and customization options</li>
                    <li>Community interaction features</li>
                    <li>Analytics and performance tracking</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">3. User Accounts</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    To access certain features of the Service, you must register for an account. When you register, you
                    agree to:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                    <li>Provide accurate, current, and complete information</li>
                    <li>Maintain and update your information to keep it accurate</li>
                    <li>Maintain the security of your password and account</li>
                    <li>Accept responsibility for all activities under your account</li>
                    <li>Notify us immediately of any unauthorized use of your account</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">4. Content Guidelines</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    You are solely responsible for the content you publish on Bloggify. You agree not to post content
                    that:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                    <li>Is illegal, harmful, threatening, abusive, or defamatory</li>
                    <li>Infringes on intellectual property rights</li>
                    <li>Contains spam, advertising, or promotional material</li>
                    <li>Is sexually explicit or contains nudity</li>
                    <li>Promotes violence, discrimination, or hatred</li>
                    <li>Contains malware, viruses, or harmful code</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">5. Intellectual Property</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    You retain ownership of the content you create and publish on Bloggify. However, by posting content,
                    you grant us a non-exclusive, worldwide, royalty-free license to use, display, and distribute your
                    content on the platform.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    The Bloggify platform, including its design, features, and functionality, is owned by us and
                    protected by copyright, trademark, and other intellectual property laws.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">6. Privacy Policy</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Your privacy is important to us. Please review our Privacy Policy, which also governs your use of
                    the Service, to understand our practices regarding the collection and use of your personal
                    information.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">7. Termination</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We may terminate or suspend your account and access to the Service immediately, without prior
                    notice, for conduct that we believe violates these Terms of Service or is harmful to other users,
                    us, or third parties, or for any other reason in our sole discretion.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">8. Disclaimer of Warranties</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    The Service is provided &quot;as is&quot; and &quot;as available&quot; without any warranties of any kind, either
                    express or implied. We do not warrant that the Service will be uninterrupted, secure, or error-free.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">9. Limitation of Liability</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    In no event shall Bloggify be liable for any indirect, incidental, special, consequential, or
                    punitive damages, including without limitation, loss of profits, data, use, goodwill, or other
                    intangible losses.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">10. Changes to Terms</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We reserve the right to modify these terms at any time. We will notify users of any material changes
                    via email or through the Service. Your continued use of the Service after such modifications
                    constitutes acceptance of the updated terms.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">11. Contact Information</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    If you have any questions about these Terms of Service, please contact us at:
                  </p>
                  <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                    <p className="text-foreground font-medium">Email: legal@bloggify.com</p>
                    <p className="text-muted-foreground">Response time: Within 48 hours</p>
                  </div>
                </section>
              </div>
            </div>

            <div className="mt-12 text-center">
              <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-xl p-8 border border-border/50">
                <h3 className="text-xl font-semibold mb-4">Ready to Start Blogging?</h3>
                <p className="text-muted-foreground mb-6">
                  Now that you&apos;ve read our terms, join thousands of writers sharing their stories on Bloggify.
                </p>
                <Button asChild size="lg" className="rounded-xl">
                  <Link href="/blog">Start Writing Today</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
