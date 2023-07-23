import AuthSection from '@/components/Main/AuthSection/AuthSection'
import MainHeading from '@/components/Main/MainHeading/MainHeading'
import AuthModal from '@/components/Modals/AuthModal'

export default function Home() {
	return (
		<>
			<MainHeading title='Главная' />
			<AuthSection />
			<AuthModal/>
		</>
	)
}
