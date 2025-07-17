import HeaderComponent from '@/components/layout/common/HeaderComponent'

const PrivacyPolicy = () => {
  return (
    <>
      <HeaderComponent
        heading='Privacy Policy'
        text='Our Privacy Policy'
        breadcrumbLinks={[
          { label: 'Home', href: '/' },
          { label: 'Privacy Policy', href: '/privacy-policy' },
        ]}
        imgUrl={'null'}
      />
      <div className='container mx-auto max-w-7xl px-4 py-12 md:px-6'>
        <div className='space-y-8'>
          <div>
            <h1 className='text-3xl font-bold'>Privacy Policy</h1>
            <p className='mt-2 italic text-muted-foreground'>
              Last updated on January 25, 2025.
            </p>
            <div className='my-3 text-muted-foreground'>
              Welcome to BPP - Community Contribution (the “App”), owned and
              operated by Bharatiya Popular Party. Your privacy is important to
              us, and this privacy policy explains how we collect, use, and
              protect your personal information. By using our App, you agree to
              the terms outlined in this privacy policy.
            </div>
          </div>
          <div>
            <h2 className='text-2xl font-bold'>1. Information We Collect</h2>
            <p className='mt-2 text-muted-foreground'>
              We may collect the following types of personal information:
            </p>
            <h3 className='mt-4 text-xl font-semibold'>
              Information You Provide:
            </h3>
            <ul className='mt-2 space-y-2 text-muted-foreground'>
              <li>
                Registration details such as name, email, phone number, and
                demographic data.
              </li>
              <li>
                Data related to consultations, contributions, or other
                interactions within the app.
              </li>
            </ul>
            <h3 className='mt-4 text-xl font-semibold'>
              Automatically Collected Information:
            </h3>
            <ul className='mt-2 space-y-2 text-muted-foreground'>
              <li>
                App usage data, such as features accessed and interaction
                patterns.
              </li>
              <li>
                Device information, including device ID, operating system, and
                IP address.
              </li>
            </ul>
            <h3 className='mt-4 text-xl font-semibold'>Sensitive Data:</h3>
            <ul className='mt-2 space-y-2 text-muted-foreground'>
              <li>
                Contributions or opinions that may relate to political views.
              </li>
            </ul>
          </div>
          <div>
            <h2 className='text-2xl font-bold'>
              2. How We Use Your Information
            </h2>
            <p className='mt-2 text-muted-foreground'>
              We use the information collected for the following purposes:
            </p>
            <ul className='mt-4 space-y-2 text-muted-foreground'>
              <li>To administer and improve the App.</li>
              <li>
                To enable you to register, contribute, or seek consultations
                within the app.
              </li>
              <li>
                To personalize your experience and provide relevant content or
                features.
              </li>
              <li>
                To communicate with you, such as sending updates, notifications,
                or responses to your inquiries.
              </li>
            </ul>
          </div>
          <div>
            <h2 className='text-2xl font-bold'>
              3. Data Sharing and Disclosure
            </h2>
            <p className='mt-2 text-muted-foreground'>
              We do not sell or share your personal data with third parties
              except:
            </p>
            <ul className='mt-4 space-y-2 text-muted-foreground'>
              <li>To comply with legal obligations or court orders.</li>
              <li>
                When necessary to operate and provide the app’s services (e.g.,
                secure payment processing or analytics).
              </li>
              <li>
                With your explicit consent for specific services or features.
              </li>
            </ul>
          </div>
          <div>
            <h2 className='text-2xl font-bold'>4. Permissible Age</h2>
            <p className='mt-2 text-muted-foreground'>
              As per the party’s constitution, this app is not intended for
              users under the age of 18.
            </p>
            <p className='mt-2 text-muted-foreground'>
              If we become aware that an underage user has registered, we will
              delete the account and associated data promptly.
            </p>
            <p className='mt-2 text-muted-foreground'>
              Parents or guardians can contact us at{' '}
              <a
                href='mailto:bpp.headoffice@gmail.com'
                className='text-blue-600 underline'
              >
                bpp.headoffice@gmail.com
              </a>{' '}
              to report any underage accounts.
            </p>
          </div>
          <div>
            <h2 className='text-2xl font-bold'>5. Data Retention</h2>
            <p className='mt-2 text-muted-foreground'>
              We retain personal information as long as it is required to
              provide services or as mandated by law. If you wish to delete your
              account or personal data, please contact us at{' '}
              <a
                href='mailto:bpp.headoffice@gmail.com'
                className='text-blue-600 underline'
              >
                bpp.headoffice@gmail.com
              </a>
              . Requests for deletion will be processed within 30 days.
            </p>
          </div>
          <div>
            <h2 className='text-2xl font-bold'>6. Data Security</h2>
            <p className='mt-2 text-muted-foreground'>
              We take strict measures to protect your data, including:
            </p>
            <ul className='mt-4 space-y-2 text-muted-foreground'>
              <li>
                <span className='font-medium'>Encryption:</span> Secure
                transmission of data using SSL protocols.
              </li>
              <li>
                <span className='font-medium'>Access Controls:</span>{' '}
                Restricting access to personal information to authorized
                personnel only.
              </li>
              <li>
                <span className='font-medium'>Regular Audits:</span> Periodic
                security reviews to identify and address vulnerabilities.
              </li>
            </ul>
          </div>
          <div>
            <h2 className='text-2xl font-bold'>7. Your Rights</h2>
            <p className='mt-2 text-muted-foreground'>
              You have the following rights regarding your personal information:
            </p>
            <ul className='mt-4 space-y-2 text-muted-foreground'>
              <li>
                <span className='font-medium'>Access:</span> View the personal
                data we hold about you.
              </li>
              <li>
                <span className='font-medium'>Correction:</span> Request
                corrections to inaccurate or incomplete data.
              </li>
              <li>
                <span className='font-medium'>Deletion:</span> Request permanent
                deletion of your data and account.
              </li>
            </ul>
            <p className='mt-2 text-muted-foreground'>
              To exercise these rights, email us at{' '}
              <a
                href='mailto:bpp.headoffice@gmail.com'
                className='text-blue-600 underline'
              >
                bpp.headoffice@gmail.com
              </a>
              .
            </p>
          </div>
          <div>
            <h2 className='text-2xl font-bold'>8. Consent and Updates</h2>
            <p className='mt-2 text-muted-foreground'>
              By using the App, you consent to the collection and use of your
              information as outlined in this policy.
            </p>
            <p className='mt-2 text-muted-foreground'>
              We will notify users of any material changes to this privacy
              policy through in-app notifications or emails.
            </p>
            <p className='mt-2 text-muted-foreground'>
              The “Last Updated” date will reflect the most recent changes.
            </p>
          </div>
          <div>
            <h2 className='text-2xl font-bold'>9. Compliance with Laws</h2>
            <p className='mt-2 text-muted-foreground'>
              This privacy policy is governed by Indian laws, including the
              Digital Personal Data Protection Act, 2023. We comply with all
              applicable laws related to data privacy and protection.
            </p>
          </div>
          <div>
            <h2 className='text-2xl font-bold'>10. Contact Us</h2>
            <p className='mt-2 text-muted-foreground'>
              If you have any questions, concerns, or requests related to this
              privacy policy or the way we handle your data, please contact us:
            </p>
            <p className='mt-2 text-muted-foreground'>
              Email:{' '}
              <a
                href='mailto:bpp.headoffice@gmail.com'
                className='text-blue-600 underline'
              >
                bpp.headoffice@gmail.com
              </a>
            </p>
          </div>
          <div>
            <h2 className='text-2xl font-bold'>11. Disclaimer</h2>
            <p className='mt-2 text-muted-foreground'>
              We are committed to maintaining your trust and safeguarding your
              privacy. However, no system is completely secure, and we cannot
              guarantee absolute security. Use of the app is at your own risk.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default PrivacyPolicy
