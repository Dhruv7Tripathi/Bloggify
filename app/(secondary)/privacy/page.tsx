import Link from "next/link"
import { ArrowLeft, Shield, Lock, Eye, Database, UserCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PrivacyPolicy() {
  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-background to-muted/30">
        <div aria-hidden className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-20 right-1/4 w-72 h-72 bg-green-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
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
                <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                  <Shield className="size-6 text-green-600" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  Privacy Policy
                </h1>
              </div>

              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Your privacy matters to us. This policy explains how we collect, use, and protect your personal
                information when you use Bloggify.
              </p>

              <div className="mt-6 text-sm text-muted-foreground">
                <span className="font-medium">Last updated:</span> December 7, 2024
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <div className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-xl p-8 space-y-8">
                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Eye className="size-5 text-green-600" />
                    1. Information We Collect
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We collect information you provide directly to us and information we obtain automatically when you
                    use our services.
                  </p>

                  <h3 className="text-lg font-medium text-foreground mb-3">Information You Provide:</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-4">
                    <li>Account information (name, email address, password)</li>
                    <li>Profile information (bio, profile picture, social links)</li>
                    <li>Content you create (blog posts, comments, messages)</li>
                    <li>Communication with us (support requests, feedback)</li>
                  </ul>

                  <h3 className="text-lg font-medium text-foreground mb-3">Information We Collect Automatically:</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                    <li>Usage data (pages visited, time spent, interactions)</li>
                    <li>Device information (browser type, operating system, IP address)</li>
                    <li>Cookies and similar tracking technologies</li>
                    <li>Analytics data to improve our services</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Database className="size-5 text-blue-600" />
                    2. How We Use Your Information
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We use the information we collect to provide, maintain, and improve our services:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                    <li>Create and manage your account</li>
                    <li>Provide customer support and respond to inquiries</li>
                    <li>Send important updates about our services</li>
                    <li>Improve our platform and develop new features</li>
                    <li>Prevent fraud and ensure platform security</li>
                    <li>Comply with legal obligations</li>
                    <li>Send marketing communications (with your consent)</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <UserCheck className="size-5 text-purple-600" />
                    3. Information Sharing
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We do not sell, trade, or rent your personal information to third parties. We may share your
                    information in the following circumstances:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                    <li>
                      <strong>With your consent:</strong> When you explicitly agree to share information
                    </li>
                    <li>
                      <strong>Service providers:</strong> Third-party services that help us operate our platform
                    </li>
                    <li>
                      <strong>Legal requirements:</strong> When required by law or to protect our rights
                    </li>
                    <li>
                      <strong>Business transfers:</strong> In connection with mergers or acquisitions
                    </li>
                    <li>
                      <strong>Public content:</strong> Blog posts and comments you choose to make public
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Lock className="size-5 text-red-600" />
                    4. Data Security
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We implement appropriate security measures to protect your personal information:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                    <li>Encryption of data in transit and at rest</li>
                    <li>Regular security audits and updates</li>
                    <li>Access controls and authentication measures</li>
                    <li>Secure hosting infrastructure</li>
                    <li>Employee training on data protection</li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute
                    security of your information.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">5. Cookies and Tracking</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We use cookies and similar technologies to enhance your experience:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                    <li>
                      <strong>Essential cookies:</strong> Required for basic platform functionality
                    </li>
                    <li>
                      <strong>Analytics cookies:</strong> Help us understand how you use our platform
                    </li>
                    <li>
                      <strong>Preference cookies:</strong> Remember your settings and preferences
                    </li>
                    <li>
                      <strong>Marketing cookies:</strong> Used for targeted advertising (with consent)
                    </li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    You can control cookie settings through your browser preferences.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">6. Your Rights and Choices</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    You have several rights regarding your personal information:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                    <li>
                      <strong>Access:</strong> Request a copy of your personal data
                    </li>
                    <li>
                      <strong>Correction:</strong> Update or correct inaccurate information
                    </li>
                    <li>
                      <strong>Deletion:</strong> Request deletion of your personal data
                    </li>
                    <li>
                      <strong>Portability:</strong> Export your data in a machine-readable format
                    </li>
                    <li>
                      <strong>Opt-out:</strong> Unsubscribe from marketing communications
                    </li>
                    <li>
                      <strong>Restriction:</strong> Limit how we process your information
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">7. Data Retention</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We retain your personal information for as long as necessary to provide our services and fulfill the
                    purposes outlined in this policy. When you delete your account, we will delete your personal
                    information within 30 days, except where we need to retain it for legal compliance or legitimate
                    business purposes.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">8. Children's Privacy</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Bloggify is not intended for children under 13 years of age. We do not knowingly collect personal
                    information from children under 13. If we become aware that we have collected personal information
                    from a child under 13, we will take steps to delete such information.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">9. International Data Transfers</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Your information may be transferred to and processed in countries other than your own. We ensure
                    appropriate safeguards are in place to protect your information in accordance with this privacy
                    policy and applicable data protection laws.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">10. Changes to This Policy</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We may update this privacy policy from time to time. We will notify you of any material changes by
                    posting the new policy on this page and updating the "Last updated" date. We encourage you to review
                    this policy periodically.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">11. Contact Us</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    If you have any questions about this Privacy Policy or our data practices, please contact us:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-medium text-foreground mb-2">General Inquiries</h4>
                      <p className="text-muted-foreground">privacy@bloggify.com</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-medium text-foreground mb-2">Data Protection Officer</h4>
                      <p className="text-muted-foreground">dpo@bloggify.com</p>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            <div className="mt-12 text-center">
              <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-xl p-8 border border-border/50">
                <h3 className="text-xl font-semibold mb-4">Your Privacy is Protected</h3>
                <p className="text-muted-foreground mb-6">
                  We're committed to keeping your data safe and giving you control over your privacy.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="rounded-xl">
                    <Link href="/blog">Start Blogging Safely</Link>
                  </Button>
                  <Button variant="outline" asChild size="lg" className="rounded-xl">
                    <Link href="/contactus">Contact Privacy Team</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
