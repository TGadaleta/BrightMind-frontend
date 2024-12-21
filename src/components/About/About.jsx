import React from 'react';
import styles from './About.module.css';

const About = () => {
	return (
		<>
			<h2>About Us!</h2>

			<p>
				"A bright mind is not defined by how much you know, but by the curiosity
				and passion to learn more. It's the spark that drives innovation, solves
				problems, and inspires others to see the world through a different lens.
				Embrace your ability to think critically, dream boldly, and never stop
				growing. A bright mind is a gift that has the power to light up not only
				your path but the paths of those around you."
			</p>

			<hr></hr>

			<section className={StyleSheet.testimonial}>
				<header>
					<h3>Testimonial 1: The Power of a Bright Mind</h3>
				</header>
				<article>
					<header>
						<h4> — Alicia Harper, Entrepreneur</h4>
					</header>
					<p>
						"Having a bright mind is like having an endless source of
						inspiration. It’s not just about intelligence, but about the ability
						to think critically, solve problems creatively, and envision a
						future full of possibilities. I’ve always believed that a sharp mind
						allows us to see the world in ways others may not, to challenge the
						status quo, and to keep pushing the boundaries of what’s possible. A
						bright mind doesn’t just excel in academic pursuits—it allows you to
						thrive in any situation, making every obstacle an opportunity to
						grow. I feel incredibly fortunate to have nurtured my mind through
						years of learning, exploration, and self-reflection, and I owe much
						of my success to the mindset that anything is possible when you
						believe in your abilities."
					</p>
				</article>
			</section>

			<hr></hr>
		</>
	);
};

export default About;
