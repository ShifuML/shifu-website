---
title: Create A Shifu Plugin
---

Create Your First Shifu Plugin in 10 Minutes
===========================================

This is an example to create a DummyUnivariateStatsCalculator, which ignores the input data and parameters but report a fake total frequency for every field.

## Create Project

Create a new Maven project(does not necessarily inside ``shifu`` code repo)

* GroupId: choose your own or use ``ml.shifu``
* ArtifactId: choose your own, recommended format: ``shifu-plugin-<pluginname>``, here we use ``shifu-plugin-dummy``

The created project should have a ``pom.xml`` containing the following info:

    <groupId>ml.shifu</groupId>
    <artifactId>shifu-plugin-dummy</artifactId>
    <version>1.0-SNAPSHOT</version>

## Add dependencies 

Add ``shifu-core`` as dependency, plus other dependencies required by your code.

    <dependencies>
        <dependency>
            <groupId>ml.shifu</groupId>
            <artifactId>shifu-core</artifactId>
            <version>0.3.0-SNAPSHOT</version>
        </dependency>
    </dependencies>

## Add Java class

Create a Java class, use the package name ``ml.shifu.plugin.dummy``. Make sure the Java class implements the interface ``ml.shifu.core.di.spi.UnivariateStatsCalculator``

    #!java
    package ml.shifu.plugin.dummy;

    import ml.shifu.core.di.spi.UnivariateStatsCalculator;
    import ml.shifu.core.util.Params;
    import org.dmg.pmml.Counts;
    import org.dmg.pmml.DataField;
    import org.dmg.pmml.UnivariateStats;

    import java.util.List;

    public class DummyUnivariateStatsCalculator implements UnivariateStatsCalculator {

        public UnivariateStats calculate(DataField field, List<? extends Object> values, Params params) {
            
            // Create a new UnivariateStats Object
            UnivariateStats univariateStats = new UnivariateStats();
            
            // Set fieldName
            univariateStats.setField(field.getName());

            // Create a new Counts Object
            Counts counts = new Counts();

            // Blindly set the totalFreq as 101
            counts.setTotalFreq(101);

            // Add the Counts to UnivariateStats
            univariateStats.setCounts(counts);

            // return the result
            return univariateStats;
        }
    }
    
## Compile

    $ mvn package

## Plug in

Plug the jar file in ``$SHIFU_HOME/plugin``

    $ cp target/shifu-plugin-dummy-1.0-SNAPSHOT.jar $SHIFU_HOME/plugin


